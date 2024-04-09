export async function ApiCNPJ(cnpj: string) {
    try {
        const res = await fetch(`https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpj}`)

        return res.json();
    } catch (error) {
        
    }
}