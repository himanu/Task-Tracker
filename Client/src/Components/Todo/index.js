import { useSelector } from "react-redux";
import { getAuthState } from "../../Store/Selectors/Auth";
const Todo = () => {
    const {user} = useSelector(getAuthState);
    return (
        <div style={{height: '100%',width: '100%', background: '#fff', textAlign: 'center', paddingTop: '2rem'}}>
            <div>
                <div>
                 <span style={{fontSize: '1.75rem', fontWeight: '500'}}> Hey {(user.name).split(' ')[0]} 🤗 </span>
                </div>
            </div>
            <form>
                <input
                    type="text"
                    id="new-todo-input"
                    name="new-todo"
                    autocomplete="off"
                    placeholder="What needs to be done?"
                />
                <button type="submit">
                    Add
                </button>
            </form>
        </div>
    )
}
export default Todo;