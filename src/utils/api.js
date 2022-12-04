const url = 'https://itunes.apple.com/search'

const api = {
    medias: [
        'music',
        'musicVideo',
        'movie',
        'podcast',
        'audiobook',
        'shortFilm',
        'tvShow',
        'software',
        'ebook',
        'all'
    ],
    entities: {
        music: ['musicArtist', 'musicTrack', 'album', 'musicVideo', 'mix', 'song']
    },
    attributes: {
        music: ['mixTerm', 'genreIndex', 'artistTerm', 'composerTerm', 'albumTerm', 'ratingIndex', 'songTerm']
    },

    search: async (term, media = 'all', entity, attribute, limit = 50, offset = 0) => {
        term = term.replace(' ', '+')
        const res = await fetch(`${url}?term=${term}&media=${media}&entity=${entity}&attribute=${attribute}&limit=${limit}&offset=${offset}`)
        return await res.json()
    }

}

export { api }