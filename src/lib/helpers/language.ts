import { GetLanguages } from '../../query/language';
import type { GetLanguagesResponse } from '../../query/language';
import { query } from 'svelte-apollo';
import type { ReadableQuery } from 'svelte-apollo';

export const languages = (): ReadableQuery<GetLanguagesResponse> => {
	const langs = query<GetLanguagesResponse>(GetLanguages);

	return langs;
};
