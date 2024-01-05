import { fetchCompanyById } from "@/actions";
import EditForm from "@/components/edit-form"

export default async function Page({ params }: { params: { id: string }}) {
    const id = params.id;
    console.log(id)
    const { name, address, phone } = await fetchCompanyById(id);
    const formData: {
        id: String,
        name: String,
        address: {
            street: String,
            postcode: String,
            city: String,
            province: String,
            country: String,
        },
        phone: String,
    } = { id, name, address, phone }

    console.log(formData)
    // <EditForm data={data}></EditForm>

    return (
        <main>Hello
            <EditForm initialData={formData}></EditForm>
        </main>
        
    )
}