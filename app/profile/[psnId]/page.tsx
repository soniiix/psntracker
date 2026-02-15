export default async function Default({ params }: {
    params: Promise<{ psnId: string }>
}) {
    const { psnId } = await params

    return (
        <div></div>
    )
}