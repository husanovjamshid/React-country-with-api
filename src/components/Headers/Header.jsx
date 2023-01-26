import './header.scss'
import DarkImg from '../../assets/img/dark-mode.svg'

export function Header() {
    return (
        <header className="site-header shadow-sm">
        <div className="container">
          <nav className="navbar navbar-expand-lg p-3 d-md-flex justify-content-md-between align-content-md-center"> 
            <a className="navbar-brand" href="#"><p className="site-header__title">Where in the world?</p></a>
            
            <a href="#" className="dark-mode d-flex align-items-center text-decoration-none">
              <img src={DarkImg} width="15" height="13" alt="dark mode"/>
              <p className="dark-mode__title ms-2">Dark Mode</p>
            </a>
          </nav>
        </div>
      </header>
    )
}
