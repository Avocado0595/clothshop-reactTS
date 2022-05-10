import { createSelector } from 'reselect'
import { IRootReducer } from '../rootReducer'

const selectDirectory= (state:IRootReducer) => state.directory;

export const selectDirectorySection = createSelector(selectDirectory, items =>items.section);


