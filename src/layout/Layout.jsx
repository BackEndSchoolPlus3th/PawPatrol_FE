import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 w-full z-50">
                <Header />
            </header>
            <main className="flex-grow pt-16 pb-16"> {/* 헤더와 푸터의 높이만큼 패딩 추가 */}
                <Outlet />
            </main>
            <footer className="fixed bottom-0 w-full z-50">
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;