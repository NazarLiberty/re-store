import React, { createContext } from 'react'

const {
    Provider: BookstoreServiceProvider,
    Consumer: BookstoreServiceConsumer
} = createContext()

export { BookstoreServiceConsumer, BookstoreServiceProvider }