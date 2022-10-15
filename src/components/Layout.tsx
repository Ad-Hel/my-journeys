interface Props {
    children?: React.ReactNode
}

const Layout = ({ children }: Props) => (
    <div className="container mx-auto font-['montserrat'] mt-4 p-2 md:p-0">
        {children}
    </div>
) 

export default Layout