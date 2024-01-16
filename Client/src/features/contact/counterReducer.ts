export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 42,
  title: "This is test title",
};

export default function counterReducer(state = initialState) {
  return state;
}
