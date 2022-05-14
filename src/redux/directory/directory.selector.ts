import { createSelector } from 'reselect';
import { IRootReducer } from '../rootReducer';
import { IDirectoryReducer } from './directory.interface';

const selectDirectory = (state: IRootReducer) => state.directory;

export const selectDirectorySection = createSelector(
	selectDirectory,
	(items) => items.section
);