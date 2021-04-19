import React from 'react'

export const TableHeadBookScreen = () => {
    return (
        <thead className="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Year</th>
                <th className="text-nowrap" scope="col">&nbsp;</th>
            </tr>
        </thead>
    )
}
