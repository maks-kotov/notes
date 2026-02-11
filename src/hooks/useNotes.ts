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
  const [recoveryIsClicked, setRecoveryIsClicked] = useState<boolean>(false)
  const [sortByNewIsActive, setSortByNewIsActive] = useState<boolean>(true)
  const [sortByOldIsActive, setSortByOldIsActive] = useState<boolean>(false)
  const [sortByAlphabetIsActive, setSortByAlphabetIsActive] = useState<boolean>(false)
  const [showAllNotesIsActive, setShowAllNotesIsActive] = useState<boolean>(true)
  const [filterByCompletedsIsActive, setFilterByCompletedsIsActive] = useState<boolean>(false)
  const [filterByUnCompletedsIsActive, setFilterByUnCompletedsIsActive] = useState<boolean>(false)
  const [showRemovedNotesIsActive, setShowRemovedNotesIsActive] = useState<boolean>(false)
  

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
    //note - заметка из create.tsx
  
    const temp_note_id : string = `temp_${Date.now()}` // temporary id (временный id)
    
    const tempNote : NoteType = {
      ...note, temp_note_id:temp_note_id
    }

    if(note.title.trim()) {
      setErrorWhenAdding(null)
      setAllNotes((prev)=>[tempNote, ...prev])
      try {
        setAddingLoading(true)
        if (session !== null) {
          const { data, error } = await supabase
            .from("notes")
            .insert([
              //note_id && created_at будет добавляться автоматически бдшкой
              {
                title: note.title,
                content: note.content,
                completed: note.completed,
                user_id: session.user.id,
                updated_at: null,
                removed_at: null,
                removed_in_ui: false,
                recovered_at: null,
                temp_note_id: temp_note_id
              },
            ])
            .select()
            .single()
            
            if(error) throw error
            setAllNotes(prev => {
                return prev.map(note => note.temp_note_id === temp_note_id ? data : note)
              }
            )
        }
      } catch (error) {
        console.log("error during adding: ", error);
        setAllNotes(prev => prev.filter(note => note.temp_note_id !== temp_note_id));
      } finally {
        setAddingLoading(false)
      }
    }
    else {
      setErrorWhenAdding("Пожалуйста, добавьте заголовок")
    }
  }, [addingLoading, errorWhenAdding])

  const remove = useCallback( async (note_id: number) => {
    if(showRemovedNotesIsActive) {
      const removingNote = allNotes.find(n=>n.note_id===note_id)
      
      if (!removingNote) {
        console.log('я не нашёл заметку для удаления здесь: ', allNotes);
        return;
      }
      setAllNotes(prev => prev.filter(n => n.note_id !== note_id));

      console.log('code of removing');
      try {
      const {error} = await supabase
      .from("notes")
      .delete()
      .eq("note_id", note_id) //удаление с бд
      if(error) throw error
      //setAllNotes((prev) => prev.filter((n) => n.note_id !== note_id)); //удаление с локального массива
      } catch (error) {
        console.log('ошибка при удалении', error);
        setAllNotes(prev => [...prev,removingNote].sort((a, b) => a.note_id - b.note_id));
      }
    }
    else {
      const removingNote = allNotes.find(n=>n.note_id===note_id)
      if (!removingNote) {
        console.log('я не нашёл заметку для удаления здесь: ', allNotes);
        return;
      }
      setAllNotes(prev => prev.map(n => n.note_id === note_id ? 
        {...n, removed_in_ui: true} 
        : n
      ));

      console.log('code of updating');
      try {
      const {data, error} = await supabase
      .from("notes")
      .update({
        removed_in_ui: true,
        removed_at: new Date().toISOString()
      })
      .eq("note_id", note_id)
      .select()
      .single()
      //лишний спиннер, как мне кажется.
        if(error) throw error
        setAllNotes((prev) => 
          prev.map((n) => 
            n.note_id === note_id 
              ? data 
              : n
          )
        );
      } catch (error) {
        console.log('ошибка при обновлении статуса removed_in_ui: ', error);
        setAllNotes(prev => prev.map(n => n.note_id === note_id ? 
        {...n, removed_in_ui: false} 
        : n
      ))
      } 
    }
    
  }, [showRemovedNotesIsActive, allNotes])

  const recover = useCallback(async (note_id:number) => {
    const recoveringNote = allNotes.find(n=>n.note_id===note_id)
      if (!recoveringNote) {
        console.log('я не нашёл заметку для восстановления здесь: ', allNotes);
        return;
      }
      setAllNotes(prev => prev.map(n => n.note_id === note_id ? 
        {...n, removed_in_ui: false} 
        : n
      ));
      console.log('code of recovering');
      
    try {
      // setRecoveringLoading(note_id)
      const {data, error} = await supabase
      .from("notes")
      .update({
        removed_in_ui: false,
        recovered_at: new Date().toISOString()
      })
      .eq("note_id", note_id)
      .select()
      .single()
      if(error) throw error
        setAllNotes((prev) => //чтобы изменить свойство recovered_at
          prev.map((n) => 
            n.note_id === note_id 
              ? data 
              : n
          )
        );
      } catch (error) {
      console.log('ошибка при восстановлении', error);
      setAllNotes(prev => prev.map(n => n.note_id === note_id ? 
      {...n, removed_in_ui: true} 
      : n
      ))
    }
  },[allNotes])

  const update = useCallback(async (note_id: number, changes: NoteType) => { //при нажатии на update будет 2 перерисовки: тк меняется пропс isEdit, а потом  displayedNotes. также в changes лишние данные хранятся
    const updatingNote = allNotes.find(n=>n.note_id===note_id)
      if (!updatingNote) {
        console.log('я не нашёл заметку для редактирования здесь: ', allNotes);
        return;
      }
      setAllNotes(prev => prev.map(n => n.note_id === note_id ? 
        {...n, title: changes.title, content: changes.content} 
        : n
      ));
      console.log('code of editing');
    try {
      if(session?.user.id) {
        const { data, error } = await supabase
          .from('notes')
          .update({ // оставит старое значение createdAt, note_id, completed, user_id, updated_at
            title: changes.title,
            content: changes.content,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', session.user.id)
          .eq('note_id', note_id)
          .select() // вернуть обновлённые записи (массив объектов)
          .single() // если в массиве всего 1 элемент - он преобразуется в объект. если более 1 элемента - выбросит ошибку.
        
        if(error) throw error
          setAllNotes((prev) => // чтобы поменять updated_at. 
          prev.map((n) => 
            n.note_id === note_id 
              ? data 
              : n
          )
        );
      }
    } catch (error) {
      console.log('редактирование не удалось: ', error);
      setAllNotes(prev => prev.map(n => n.note_id === note_id ? 
      {...n, title: updatingNote.title, content: updatingNote.content, updated_at: null} 
      : n
      ))
    } 
    

  }, [allNotes])

  const toggle = useCallback(async (note_id: number, completed: boolean) => {
    const toggleNote = allNotes.find(n=>n.note_id===note_id)
      if (!toggleNote) {
        console.log('я не нашёл заметку для пометки здесь: ', allNotes);
        return;
      }
      setAllNotes(prev => prev.map(n => n.note_id === note_id ? 
        {...n, completed: !completed} 
        : n
      ));
      console.log('code of toggle');

    if(session) {
      try {
        const {error} = await supabase
        .from('notes')
        .update({completed: !completed})
        .eq('user_id', session.user.id)
        .eq('note_id', note_id)
        if(error) throw error

      } catch (error) {
        setAllNotes(prev => prev.map(n => n.note_id === note_id ? 
        {...n, completed: toggleNote.completed} 
        : n
        ));
      }
    }
  }, [allNotes])
  
  //сортировка::
  const sortByNew = () => {
    setSortByNewIsActive(true)
    setSortByOldIsActive(false)
    setSortByAlphabetIsActive(false)

    setAllNotes([...allNotes].sort((a,b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
  };
  const sortByOld = () => {
    setSortByOldIsActive(true)
    setSortByNewIsActive(false)
    setSortByAlphabetIsActive(false)

    setAllNotes([...allNotes].sort((a,b)=>new Date(a.created_at).getTime() - new Date(b.created_at).getTime()))
  };
  const sortByAlphabet = () => {
    setSortByAlphabetIsActive(true)
    setSortByOldIsActive(false)
    setSortByNewIsActive(false)
    setAllNotes([...allNotes].sort((a,b)=> a.title.toLowerCase().localeCompare(b.title.toLowerCase()))) //изменение самого массива allNotes
  };
  //фильтры:
  const showAllNotes = () => {
    setShowAllNotesIsActive(true)
    setShowRemovedNotesIsActive(false)
    setFilterByCompletedsIsActive(false)
    setFilterByUnCompletedsIsActive(false)
    setFilteredNotes(null);
  };
  const showRemovedNotes = () => {
    setShowAllNotesIsActive(false)
    setFilterByCompletedsIsActive(false)
    setFilterByUnCompletedsIsActive(false)
    setShowRemovedNotesIsActive(true)
  }
  const filterByCompleteds = () => {
    setFilteredNotes(null);
    setShowAllNotesIsActive(false)
    setShowRemovedNotesIsActive(false)
    setFilterByCompletedsIsActive(true)
    setFilterByUnCompletedsIsActive(false)
    const filtered = allNotes.filter((note) => note.completed);
    setFilteredNotes(filtered);
  };
  const filterByUnCompleteds = () => {
    setShowAllNotesIsActive(false)
    setShowRemovedNotesIsActive(false)
    setFilterByCompletedsIsActive(false)
    setFilterByUnCompletedsIsActive(true)
    setFilteredNotes(null);
    const filtered = allNotes.filter((note) => !note.completed);
    setFilteredNotes(filtered);
  };

  return {
    displayedNotes,
    add,
    update,
    remove,
    recover,
    toggle,
    sortByNew,
    sortByOld,
    sortByAlphabet,
    filterByCompleteds,
    filterByUnCompleteds,
    showAllNotes,
    showRemovedNotes,
    gettingLoading,
    addingLoading,
    recoveryIsClicked,
    errorWhenAdding,
    sortByNewIsActive,
    sortByOldIsActive,
    showAllNotesIsActive,
    filterByCompletedsIsActive,
    filterByUnCompletedsIsActive,
    sortByAlphabetIsActive,
    showRemovedNotesIsActive,
    setRecoveryIsClicked,
  };
}
