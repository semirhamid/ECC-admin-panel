import React from 'react';
import UsersIcon from './usersIcon';

export default function OverviewCard() {
    return (
        <div className='flex justify-between'>
            <div>
                <h2 className='font-bold text-4xl'>OverView</h2>
            </div>
            <div className='flex h-10 my-auto'>
                <span className='flex items-center px-3'>
                    <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M11.7835 2.75741C11.7835 2.46453 11.5484 2.22711 11.2585 2.22711L9.1585 2.22711C8.86855 2.22711 8.6335 2.46453 8.6335 2.75741L8.6335 11.2423C8.6335 11.5351 8.86855 11.7726 9.1585 11.7726L11.2585 11.7726C11.5484 11.7726 11.7835 11.5351 11.7835 11.2423L11.7835 2.75741ZM11.2585 1.1665C12.1283 1.1665 12.8335 1.87878 12.8335 2.75741L12.8335 11.2423C12.8335 12.1209 12.1283 12.8332 11.2585 12.8332L9.1585 12.8332C8.28865 12.8332 7.5835 12.1209 7.5835 11.2423L7.5835 2.75741C7.5835 1.87878 8.28865 1.1665 9.1585 1.1665L11.2585 1.1665Z'
                            fill='black'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M5.3665 2.75741C5.3665 2.46453 5.13145 2.22711 4.8415 2.22711L2.7415 2.22711C2.45155 2.22711 2.2165 2.46453 2.2165 2.75741L2.2165 11.2423C2.2165 11.5351 2.45155 11.7726 2.7415 11.7726L4.8415 11.7726C5.13145 11.7726 5.3665 11.5351 5.3665 11.2423L5.3665 2.75741ZM4.8415 1.1665C5.71135 1.1665 6.4165 1.87878 6.4165 2.75741L6.4165 11.2423C6.4165 12.1209 5.71135 12.8332 4.8415 12.8332L2.7415 12.8332C1.87165 12.8332 1.1665 12.1209 1.1665 11.2423L1.1665 2.75741C1.1665 1.87878 1.87166 1.1665 2.7415 1.1665L4.8415 1.1665Z'
                            fill='black'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M10.2083 3.5C10.3694 3.5 10.5 3.62993 10.5 3.79022L10.5 3.79312C10.5 3.9534 10.3694 4.08333 10.2083 4.08333C10.0473 4.08333 9.91667 3.9534 9.91667 3.79312L9.91667 3.79022C9.91667 3.62993 10.0473 3.5 10.2083 3.5Z'
                            fill='black'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M3.79183 3.5C3.95291 3.5 4.0835 3.62993 4.0835 3.79022L4.0835 3.79312C4.0835 3.9534 3.95291 4.08333 3.79183 4.08333C3.63075 4.08333 3.50016 3.9534 3.50016 3.79312L3.50016 3.79022C3.50016 3.62993 3.63075 3.5 3.79183 3.5Z'
                            fill='black'
                        />
                    </svg>
                    <p className='pl-2 font-semibold text-lg'>Kanban</p>
                </span>
                <span className='px-3 items-center bg-active rounded-[45px] flex'>
                    <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M1.1665 8.16683C1.1665 7.84466 1.42767 7.5835 1.74984 7.5835H5.83317C6.15534 7.5835 6.4165 7.84466 6.4165 8.16683V12.2502C6.4165 12.5723 6.15534 12.8335 5.83317 12.8335H1.74984C1.42767 12.8335 1.1665 12.5723 1.1665 12.2502V8.16683ZM2.33317 8.75016V11.6668H5.24984V8.75016H2.33317Z'
                            fill='white'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M1.1665 1.74984C1.1665 1.42767 1.42767 1.1665 1.74984 1.1665H5.83317C6.15534 1.1665 6.4165 1.42767 6.4165 1.74984V5.83317C6.4165 6.15534 6.15534 6.4165 5.83317 6.4165H1.74984C1.42767 6.4165 1.1665 6.15534 1.1665 5.83317V1.74984ZM2.33317 2.33317V5.24984H5.24984V2.33317H2.33317Z'
                            fill='white'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M7.5835 2.33333C7.5835 2.01117 7.84466 1.75 8.16683 1.75H12.2502C12.5723 1.75 12.8335 2.01117 12.8335 2.33333C12.8335 2.6555 12.5723 2.91667 12.2502 2.91667H8.16683C7.84466 2.91667 7.5835 2.6555 7.5835 2.33333Z'
                            fill='white'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M7.5835 5.24984C7.5835 4.92767 7.84466 4.6665 8.16683 4.6665H12.2502C12.5723 4.6665 12.8335 4.92767 12.8335 5.24984C12.8335 5.572 12.5723 5.83317 12.2502 5.83317H8.16683C7.84466 5.83317 7.5835 5.572 7.5835 5.24984Z'
                            fill='white'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M7.5835 8.74984C7.5835 8.42767 7.84466 8.1665 8.16683 8.1665H12.2502C12.5723 8.1665 12.8335 8.42767 12.8335 8.74984C12.8335 9.072 12.5723 9.33317 12.2502 9.33317H8.16683C7.84466 9.33317 7.5835 9.072 7.5835 8.74984Z'
                            fill='white'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M7.5835 11.6668C7.5835 11.3447 7.84466 11.0835 8.16683 11.0835H12.2502C12.5723 11.0835 12.8335 11.3447 12.8335 11.6668C12.8335 11.989 12.5723 12.2502 12.2502 12.2502H8.16683C7.84466 12.2502 7.5835 11.989 7.5835 11.6668Z'
                            fill='white'
                        />
                    </svg>
                    <p className='pl-2 text-white'>List View</p>
                </span>
                <span className='flex items-center px-3'>
                    <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M2.33333 7.58301C2.6555 7.58301 2.91667 7.84417 2.91667 8.16634V12.2497C2.91667 12.5718 2.6555 12.833 2.33333 12.833C2.01117 12.833 1.75 12.5718 1.75 12.2497V8.16634C1.75 7.84417 2.01117 7.58301 2.33333 7.58301Z'
                            fill='#333333'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M2.33333 1.1665C2.6555 1.1665 2.91667 1.42767 2.91667 1.74984V5.83317C2.91667 6.15534 2.6555 6.4165 2.33333 6.4165C2.01117 6.4165 1.75 6.15534 1.75 5.83317V1.74984C1.75 1.42767 2.01117 1.1665 2.33333 1.1665Z'
                            fill='#333333'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M6.99984 6.4165C7.322 6.4165 7.58317 6.67767 7.58317 6.99984V12.2498C7.58317 12.572 7.322 12.8332 6.99984 12.8332C6.67767 12.8332 6.4165 12.572 6.4165 12.2498V6.99984C6.4165 6.67767 6.67767 6.4165 6.99984 6.4165Z'
                            fill='#333333'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M6.99984 1.1665C7.322 1.1665 7.58317 1.42767 7.58317 1.74984V4.6665C7.58317 4.98867 7.322 5.24984 6.99984 5.24984C6.67767 5.24984 6.4165 4.98867 6.4165 4.6665V1.74984C6.4165 1.42767 6.67767 1.1665 6.99984 1.1665Z'
                            fill='#333333'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M11.6668 8.75C11.989 8.75 12.2502 9.01117 12.2502 9.33333V12.25C12.2502 12.5722 11.989 12.8333 11.6668 12.8333C11.3447 12.8333 11.0835 12.5722 11.0835 12.25V9.33333C11.0835 9.01117 11.3447 8.75 11.6668 8.75Z'
                            fill='#333333'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M11.6668 1.1665C11.989 1.1665 12.2502 1.42767 12.2502 1.74984V6.99984C12.2502 7.322 11.989 7.58317 11.6668 7.58317C11.3447 7.58317 11.0835 7.322 11.0835 6.99984V1.74984C11.0835 1.42767 11.3447 1.1665 11.6668 1.1665Z'
                            fill='#333333'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M0 8.16634C0 7.84417 0.261167 7.58301 0.583333 7.58301H4.08333C4.4055 7.58301 4.66667 7.84417 4.66667 8.16634C4.66667 8.48851 4.4055 8.74967 4.08333 8.74967H0.583333C0.261167 8.74967 0 8.48851 0 8.16634Z'
                            fill='#333333'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M4.6665 4.66634C4.6665 4.34417 4.92767 4.08301 5.24984 4.08301H8.74984C9.072 4.08301 9.33317 4.34417 9.33317 4.66634C9.33317 4.98851 9.072 5.24967 8.74984 5.24967H5.24984C4.92767 5.24967 4.6665 4.98851 4.6665 4.66634Z'
                            fill='#333333'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M9.3335 9.33333C9.3335 9.01117 9.59466 8.75 9.91683 8.75H13.4168C13.739 8.75 14.0002 9.01117 14.0002 9.33333C14.0002 9.6555 13.739 9.91667 13.4168 9.91667H9.91683C9.59466 9.91667 9.3335 9.6555 9.3335 9.33333Z'
                            fill='#333333'
                        />
                    </svg>
                    <p className='pl-2 border-active rounded-[45px]'>Filter</p>
                </span>
            </div>
            <div>
                <UsersIcon />
            </div>
            <div>
                <button className='bg-active flex justify-center text-white rounded-md px-4 py-3'>
                    <svg
                        width='23'
                        height='23'
                        viewBox='0 0 23 23'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M5.3916 11.5001C5.3916 11.2431 5.49367 10.9967 5.67534 10.8151C5.85702 10.6334 6.10342 10.5313 6.36035 10.5313H10.8721V6.01953C10.8721 5.7626 10.9742 5.5162 11.1559 5.33452C11.3376 5.15285 11.584 5.05078 11.8409 5.05078C12.0978 5.05078 12.3442 5.15285 12.5259 5.33452C12.7076 5.5162 12.8096 5.7626 12.8096 6.01953V10.5313H17.3214C17.5784 10.5313 17.8248 10.6334 18.0064 10.8151C18.1881 10.9967 18.2902 11.2431 18.2902 11.5001C18.2902 11.757 18.1881 12.0034 18.0064 12.1851C17.8248 12.3668 17.5784 12.4688 17.3214 12.4688H12.8096V16.9806C12.8096 17.2375 12.7076 17.4839 12.5259 17.6656C12.3442 17.8473 12.0978 17.9494 11.8409 17.9494C11.584 17.9494 11.3376 17.8473 11.1559 17.6656C10.9742 17.4839 10.8721 17.2375 10.8721 16.9806V12.4688H6.36035C6.10342 12.4688 5.85702 12.3668 5.67534 12.1851C5.49367 12.0034 5.3916 11.757 5.3916 11.5001Z'
                            fill='white'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M5.79176 0.868439C9.81203 0.42276 13.8692 0.42276 17.8895 0.868439C20.2494 1.13194 22.1546 2.99065 22.431 5.36344C22.9089 9.44123 22.9089 13.5604 22.431 17.6381C22.1533 20.0109 20.2481 21.8684 17.8895 22.1331C13.8692 22.5788 9.81203 22.5788 5.79176 22.1331C3.43189 21.8684 1.52668 20.0109 1.25026 17.6381C0.77335 13.5605 0.77335 9.44111 1.25026 5.36344C1.52668 2.99065 3.43318 1.13194 5.79176 0.868439ZM17.6751 2.79302C13.7973 2.3632 9.88394 2.3632 6.00618 2.79302C5.28832 2.87266 4.61828 3.19198 4.1043 3.69941C3.59032 4.20683 3.26241 4.87271 3.17355 5.58948C2.71417 9.5174 2.71417 13.4855 3.17355 17.4134C3.26268 18.1299 3.59071 18.7955 4.10467 19.3027C4.61863 19.8098 5.28852 20.129 6.00618 20.2086C9.85147 20.6374 13.8298 20.6374 17.6751 20.2086C18.3925 20.1287 19.0621 19.8095 19.5758 19.3023C20.0895 18.7952 20.4174 18.1297 20.5064 17.4134C20.9658 13.4855 20.9658 9.5174 20.5064 5.58948C20.4171 4.87337 20.0891 4.20823 19.5755 3.70135C19.0618 3.19447 18.3923 2.8754 17.6751 2.79561'
                            fill='white'
                        />
                    </svg>
                    <span className='ml-2'>Create New Task</span>
                </button>
            </div>
        </div>
    );
}
