import NewLocationForm from "./NewLocationForm"
import UpadateLocationForm from "./UpdateLocationForm"
import DeleteLocationForm from "./DeleteLocationForm"

export default function Admin (args: any) {
    return <>
        <NewLocationForm/>
        <UpadateLocationForm/>
        <DeleteLocationForm/>
    </>
}