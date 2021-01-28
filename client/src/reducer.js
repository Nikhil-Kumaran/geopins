export default function reducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN_USER": {
      return {
        ...state,
        currentUser: payload,
      };
    }
    case "LOGOUT_USER": {
      return {
        ...state,
        currentUser: null,
      };
    }
    default: {
      return state;
    }
  }
}
