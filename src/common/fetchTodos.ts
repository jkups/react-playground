import { TodoActionType } from "../TodoTypes";
import { loadTodos } from "../TodoActionCreators";

const url = "https://star-wars-character-search.glitch.me/api/characters";

export default function fetchTodos(dispatch: React.Dispatch<TodoActionType>) {
  const transformResponse = (characters: any[]) => {
    return characters.map((character) => ({
      id: character.id.toString(),
      title: character.name,
      edit: false,
    }));
  };

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const todos = transformResponse(response.characters);
      dispatch(loadTodos(todos));
    });
}
