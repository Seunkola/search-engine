export const updateSearchTopStoriesState = (hits, page) => (prevState) => {
    const { searchKey, results } = prevState;

    const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];

    const updatedHits = [
    ...oldHits,
    ...hits
    ];

    return {
        results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
        },
        isLoading: false
    };
};
    