import { NavLink } from "react-router-dom"

const DashboardLayout = ({menuItems = [], children}) => {
    return (
        <>
            <div class="mx-auto max-w-3xl px-6 sm:px-3 lg:max-w-full lg:px-8 lg:py-8">
                <div class="grid grid-cols-1 items-start gap-3 lg:grid-cols-4 lg:gap-8">
                    <div class="grid grid-cols-1 gap-4">
                        <section aria-labelledby="section-2-title" className="">
                            <h2 class="sr-only" id="section-2-title">Section title</h2>
                            <div class="overflow-hidden rounded-lg text-white bg-slate-900 shadow">
                                <div class="p-6">
                                    <ul>
                                        {
                                            menuItems.map((link, i) => {
                                                return (
                                                    <li key={i} className='py-2'>
                                                        <NavLink to={link?.to}>{link?.text}</NavLink>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="grid grid-cols-1 gap-4 lg:col-span-3">
                        <section aria-labelledby="section-1-title">
                            <div class="overflow-hidden rounded-lg bg-white shadow">
                                <div class="p-6">
                                    {children}
                                </div>
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DashboardLayout