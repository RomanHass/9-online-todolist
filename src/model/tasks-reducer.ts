import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
	switch (action.type) {
    case 'REMOVE_TASK': {
      return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
    }
		case 'ADD_TASK' : {
			const newTask: TaskType = { id: v1(), title: action.payload.title, isDone: false }
			return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
		}
		case 'CHANGE_TASK_STATUS': {
			return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)}
		}
		case 'CHANGE_TASK_TITLE': {
			const {todolistId, taskId, title} = action.payload
			return {...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, title} : t)}
		}
		case 'ADD-TODOLIST': {
			return {...state, [action.payload.id]: []}
		}
		case 'REMOVE-TODOLIST': {
			const copyState = {...state}
			delete copyState[action.payload.id]
			return copyState
		}
		default:
			throw new Error("I don't understand this type")
	}
}

// Action creators
export const removeTaskAC = (payload: {todolistId: string, taskId: string}) => {
	return {type: 'REMOVE_TASK', payload} as const
}

export const addTaskAC = (payload: {title: string, todolistId: string}) => {
	return { type: 'ADD_TASK', payload } as const
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => {
	return { type: 'CHANGE_TASK_STATUS', payload } as const
}

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}) => {
	return { type: 'CHANGE_TASK_TITLE', payload } as const
}

// Actions types
export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTasksActionType 
	| AddTaskActionType 
	| ChangeTaskStatusActionType 
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
