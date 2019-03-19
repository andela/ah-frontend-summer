/**
 * This module contains all actions for the project
 * They are further split into synchronous (trigger store update immediately)
 * and asynchronous actions (trigger an operation that will ultimately trigger a synchronous action)
 **/

export {
	registerUser,
	verifyUserAccount
} from './auth';
export {
	getArticle,
	deleteArticle,
	createArticle,
	updateArticle
} from './article';
