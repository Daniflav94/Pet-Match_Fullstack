export async function getDataCep(cep: string) {
    try {
        const res = await fetch(`http://viacep.com.br/ws/${cep}/json/`)

        return res.json();
    } catch (error) {
        console.log(error)
    }
}