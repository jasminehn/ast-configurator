import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import { models, RootModel } from './models'
import typedStatePlugin from '@rematch/typed-state'
 
export const store = init({
	models,
	plugins: [typedStatePlugin<RootModel>({strict: true})]
})
 
export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>