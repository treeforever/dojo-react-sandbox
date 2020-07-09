var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var counterSlice = RTK.createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: function increment(state) {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: function decrement(state) {
            state.value -= 1;
        },
        incrementByAmount: function incrementByAmount(state, action) {
            state.value += action.payload;
        }
    }
});

var _counterSlice$actions = counterSlice.actions,
    increment = _counterSlice$actions.increment,
    decrement = _counterSlice$actions.decrement,
    incrementByAmount = _counterSlice$actions.incrementByAmount;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

var incrementAsync = function incrementAsync(amount) {
    return function (dispatch) {
        setTimeout(function () {
            dispatch(incrementByAmount(amount));
        }, 1000);
    };
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
var selectCount = function selectCount(state) {
    return state.counter.value;
};

var counterReducer = counterSlice.reducer;

var store = RTK.configureStore({
    reducer: {
        counter: counterReducer
    }
});

function Counter() {
    var count = ReactRedux.useSelector(selectCount);
    var dispatch = ReactRedux.useDispatch();

    var _React$useState = React.useState('2'),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        incrementAmount = _React$useState2[0],
        setIncrementAmount = _React$useState2[1];

    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { className: "row" },
            React.createElement(
                'button',
                {
                    className: 'button',
                    'aria-label': 'Increment value',
                    onClick: function onClick() {
                        return dispatch(increment());
                    }
                },
                '+'
            ),
            React.createElement(
                'span',
                { className: 'value' },
                count
            ),
            React.createElement(
                'button',
                {
                    className: 'button',
                    'aria-label': 'Decrement value',
                    onClick: function onClick() {
                        return dispatch(decrement());
                    }
                },
                '-'
            )
        ),
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement('input', {
                className: 'textbox',
                'aria-label': 'Set increment amount',
                value: incrementAmount,
                onChange: function onChange(e) {
                    return setIncrementAmount(e.target.value);
                }
            }),
            React.createElement(
                'button',
                {
                    className: 'button',
                    onClick: function onClick() {
                        return dispatch(incrementByAmount(Number(incrementAmount) || 0));
                    }
                },
                'Add Amount'
            ),
            React.createElement(
                'button',
                {
                    className: 'asyncButton',
                    onClick: function onClick() {
                        return dispatch(incrementAsync(Number(incrementAmount) || 0));
                    }
                },
                'Add Async'
            )
        )
    );
}

var domContainer = document.querySelector('#like_button_container');
ReactDOM.render(React.createElement(
    React.StrictMode,
    null,
    React.createElement(
        ReactRedux.Provider,
        { store: store },
        React.createElement(Counter, null)
    )
), domContainer);