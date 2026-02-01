//getNotes - первый вывод заметок.
//addNote - добавляет заметку в бд и в возвращает её. в случае успеха заносит её в displayedNotes

import { useCallback, useEffect, useState } from "react";
import type { NoteType } from "../types/note";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/authContext";

export default function useNotes() {
  const [allNotes, setAllNotes] = useState<NoteType[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<null | NoteType[]>(null);
  const displayedNotes = filteredNotes === null ? allNotes : filteredNotes;
  const { session } = useAuth();
  const [gettingLoading, setGettingLoading] = useState<boolean>(false)
  const [addingLoading, setAddingLoading] = useState<boolean>(false)
  const [errorWhenAdding, setErrorWhenAdding] = useState<null | string>(null)
  const [removingLoading, setRemovingLoading] = useState<null | number>(null)
  const [editingLoading, setEditingLoading] = useState<null | number>(null)
  //появились ещё рендеры
  useEffect(()=> { //первая загрузка
    const getNotes = async () => {
      setGettingLoading(true)
      try {
        if (session !== null) {
          const { data, error } = await supabase
            .from("notes")
            .select("*")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: false });
          if (!error) {
            setAllNotes(data || []);
          } else if (error) {
            console.log(error.message);
          }
        }
        else {
          console.log('session is null bro');
        }
      } catch (error) {
        console.log("непредвиденная ОШИБОЧКА: ", error);
      } finally {
        setGettingLoading(false)
      }
    }
          getNotes()
  }, [session?.user.id])

  const add = useCallback(async (note: NoteType) => {
    //note - заметка из textarea, с её текстом.
    //мы вставляем её в бд (кроме note_id)
    //получаем её из бд и вставляем в allNotes
    if(note.title.trim()) {
      try {
        setErrorWhenAdding(null)
        setAddingLoading(true)
        if (session !== null) {
          const { data, error } = await supabase
            .from("notes")
            .insert([
              //note_id будет добавляться автоматически бдшкой
              {
                title: note.title,
                content: note.content,
                completed: note.completed,
                user_id: session.user.id,
              },
            ])
            .select();
  
          if (error) {
            console.log("ошибка: ", error.message);
            return;
          } else {
            setAllNotes((prev) => {
                return [...prev, data[0]];
            });
          }
        }
      } catch (error) {
        console.log("Непредвиденная ошибка: ", error);
      } finally {
        setAddingLoading(false)
      }
    }
    else {
      setErrorWhenAdding("Пожалуйста, добавьте заголовок")
    }
  }, [addingLoading, errorWhenAdding])

  const remove = useCallback( async (note_id: number) => {
    setRemovingLoading(note_id)
    try {
      await supabase.from("notes").delete().eq("note_id", note_id); //удаление с бд
      setAllNotes((prev) => prev.filter((n) => n.note_id !== note_id)); //удаление с локального массива
    } catch (error) {
      console.log('ошибка при удалении');
    } finally {
      setRemovingLoading(null)
    }
    //затем перерисовка displayedNotes will be changed
    //мы не можем не писать setAllNotes, тк notesList чтобы перерисоваться нужно чтобы изменился displayedNotes
  }, [removingLoading])

  const update = useCallback(async (note_id: number, changes: NoteType) => { //при нажатии на update будет 2 перерисовки: тк меняется пропс isEdit, а потом displayedNotes
    try {
      setEditingLoading(note_id)
      if(session?.user.id) {
        const { data, error } = await supabase
          .from('notes')
          .update({ // оставит старое значение createdAt, note_id, completed, user_id
            title: changes.title,
            content: changes.content,
          })
          .eq('user_id', session.user.id)
          .eq('note_id', note_id)
          .select() // вернуть обновлённую запись
          .single()
        
        if(error) {
          console.log(error.message);
        }
        else {
          setAllNotes((prev) => 
          prev.map((n) => 
            n.note_id === note_id 
              ? { ...n, ...(data || {}) } 
              : n
          )
        );
        }
      }
      //вроде я сделал чтобы можно было обновлять синхронизированно с бд
    } catch (error) {
      console.log('ошибка при редактировании: ', error);
    } finally {
      setEditingLoading(null)
    }
    

  }, [editingLoading])
  const toggle = (note_id: number) =>
    setAllNotes((prev) =>
      prev.map((n) =>
        n.note_id === note_id ? { ...n, completed: !n.completed } : n,
      ),
    );

  //сортировка::
  const sortByNew = () => {
    // setAllNotes([...allNotes].sort((a,b)=>b.createdAt.getTime() - a.createdAt.getTime()))
  };
  const sortByOld = () => {
    // setAllNotes([...allNotes].sort((a,b)=>a.createdAt.getTime() - b.createdAt.getTime()))
  };
  //фильтры:
  const showAllNotes = () => {
    setFilteredNotes(null);
  };
  const filterByCompleteds = () => {
    setFilteredNotes(null);
    const filtered = allNotes.filter((note) => note.completed);
    setFilteredNotes(filtered);
  };
  const filterByUnCompleteds = () => {
    setFilteredNotes(null);
    const filtered = allNotes.filter((note) => !note.completed);
    setFilteredNotes(filtered);
  };

  return {
    displayedNotes,
    add,
    update,
    remove,
    toggle,
    sortByNew,
    sortByOld,
    filterByCompleteds,
    filterByUnCompleteds,
    showAllNotes,
    gettingLoading,
    addingLoading,
    removingLoading,
    errorWhenAdding,
    editingLoading
  };
}
