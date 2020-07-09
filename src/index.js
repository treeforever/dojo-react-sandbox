const counterSlice = RTK.createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
const incrementAsync = amount => dispatch => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount));
    }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
const selectCount = state => state.counter.value;

const counterReducer = counterSlice.reducer;

const store = RTK.configureStore({
    reducer: {
        counter: counterReducer,
    },
});



function Counter() {
    const count = ReactRedux.useSelector(selectCount);
    const dispatch = ReactRedux.useDispatch();
    const [incrementAmount, setIncrementAmount] = React.useState('2');

    return (
        <div>
            <div className={"row"}>
                <button
                    className="button"
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
        </button>
                <span className="value">{count}</span>
                <button
                    className="button"
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
        </button>
            </div>
            <div className="row">
                <input
                    className="textbox"
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={e => setIncrementAmount(e.target.value)}
                />
                <button
                    className="button"
                    onClick={() =>
                        dispatch(incrementByAmount(Number(incrementAmount) || 0))
                    }
                >
                    Add Amount
        </button>
                <button
                    className="asyncButton"
                    onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
                >
                    Add Async
        </button>
            </div>
        </div>
    );
}

let domContainer = document.querySelector('#like_button_container');
ReactDOM.render(
    <React.StrictMode>
    <ReactRedux.Provider store={store}>
        <Counter />
    </ReactRedux.Provider>
    </React.StrictMode>
    , domContainer);
