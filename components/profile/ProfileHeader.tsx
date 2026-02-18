export default function ProfileHeader() {
    return (
        <section className="bg-secondary-bg w-full rounded-normal h-[350px] flex flex-col justify-between items-center border-l-gradient-rounded overflow-hidden">
            <div className="w-full h-[187px] flex items-center justify-center gap-[164px]">
                {/* Profile info */}
                <div className="flex items-center justify-center gap-5">
                    <img src="/avatar-placeholder.jpg" alt="Avatar placeholder" className="w-34 h-34 rounded-full"/>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-start gap-2.5">
                            <span className="text-3xl font-bold">Gamer001</span>
                            <img src="/ps-plus-logo.png" alt="PlayStation logo" className="h-7 mt-0.5"/>
                        </div>
                        <span className="text-xl text-neutral">I love gaming and pets.</span>
                        <div className="flex items-center justify-start gap-2.5">
                            <img src="/ps-logo.png" alt="PlayStation logo" className="h-4 mt-0.5"/>
                            <span className="text-xl">Joined PSN in 2022</span>
                        </div>
                    </div>
                </div>
                {/* Trophy level */}
                <div className="flex gap-5">
                    <img src="/silver-level.png" alt="Avatar placeholder" className="w-22 h-22 rounded-full"/>
                    <div className="flex flex-col">
                        <span className="text-neutral -mb-1 text-[17px]">Level</span>
                        <div className="flex w-full items-end justify-between">
                            <span className="text-[28px] font-medium -mb-0.75">315</span>
                            <span className="text-[18px]">75%</span>
                        </div>
                        <div className="bg-progress-bar mt-2 w-48 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-ps-plus h-full w-[75%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[1px] bg-divider"></div>

            <div className="w-full h-[162px] text-center">TODO</div>
        </section>
    )
}