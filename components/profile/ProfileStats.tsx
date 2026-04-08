export default function ProfileStats() {
    return (
        <section className="bg-secondary-bg w-full rounded-normal flex items-center justify-between px-10 py-8">
            <div className="flex items-end justify-center gap-2">
                <span className="text-2xl font-medium">00</span>
                <span className="text-neutral uppercase text-[15px] font-medium">Games played</span>
            </div>
            <div className="flex items-end justify-center gap-2">
                <span className="text-2xl font-medium">00</span>
                <span className="text-neutral uppercase text-[15px] font-medium">Completed games</span>
            </div>
            <div className="flex items-end justify-center gap-2">
                <span className="text-2xl font-medium">00.00%</span>
                <span className="text-neutral uppercase text-[15px] font-medium">Completion</span>
            </div>
            <div className="flex items-end justify-center gap-2 ">
                <span className="text-2xl font-medium">0.00</span>
                <span className="text-neutral uppercase text-[15px] font-medium">Trophies per day</span>
            </div>
        </section>
    );
}