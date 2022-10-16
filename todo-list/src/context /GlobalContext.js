import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

// 초기 상태
const initialState = {
  completeToDos: [],
  incompleteToDos: [],
};
