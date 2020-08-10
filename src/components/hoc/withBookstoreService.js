import React, { Component } from 'react'
import { BookstoreServiceConsumer } from '../bookstore-service-context/bookstore-service-context'

const withBookstoreService = () => (Wrapped) => {
    return (props) => {
        return <BookstoreServiceConsumer>
            {(service) => {
                return <Wrapped {...props} bookstoreService={service} />
            }}
        </BookstoreServiceConsumer>
    }
}

export default withBookstoreService