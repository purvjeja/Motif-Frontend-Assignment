import { filters } from "./common-types";

const onEmptyMessage = (filterType: filters) => {
    return (
        (filterType === 'All') ? (<h1>Emails Yet to load.</h1>) : (<h1>There are no {filterType} emails available</h1>)
    )
}

export default onEmptyMessage