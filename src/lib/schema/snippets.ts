import * as yup from 'yup';

export interface SnippetForm {
	name: string;
	code: string;
	language: string;
}

export const snippetSchema = yup.object({
	name: yup.string().max(50).required(),
	code: yup.string().max(2500).required(),
	language: yup.string().required(),
});
