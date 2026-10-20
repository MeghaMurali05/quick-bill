import { useNavigate } from 'react-router-dom';
import '../css/Home.css'
import BackButton from './BackButton';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
        <BackButton/>

<nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm px-4 py-3">
  <a className="navbar-brand fw-bold fs-3" href="/">
    Quick<span className="text-primary">Bill</span>
  </a>

  <div className="ms-auto d-flex align-items-center gap-3">
    <a href="#about" className="text-dark text-decoration-none">
      About
    </a>

    <a href="#features" className="text-dark text-decoration-none">
      Features
    </a>

    <a href="#contact" className="text-dark text-decoration-none">
      Contact
    </a>

    <button
      className="btn btn-primary"
      onClick={() => navigate('/login')}
    >
      Login
    </button>
  </div>
</nav>
      <section className="container py-5">
        <div className="row align-items-center py-4">

          <div className="col-md-6 mb-4">
            <span className="badge rounded-pill bg-light text-primary p-2 mb-3">
              SMART BILLING SYSTEM
            </span>

            <h1 className="fw-bold">
              Billing Made Easy
            </h1>

            <h2 className="text-primary mb-3">
              Manage Your Business Better
            </h2>

            <p className="text-secondary">
              Manage products, create bills and track your inventory
              easily with QuickBill
            </p>

            <button
              className="btn btn-primary btn-lg mt-3"
              onClick={() => navigate('/login')}
            >
              Get Started →
            </button>
          </div>

       
          <div className="col-md-6">
            <div className="preview p-4 shadow-sm">

              <h3 className="fw-bold mb-2">QuickBill</h3>

           

              <div className="row g-3 mb-4">

                <div className="col-6">
                  <div className="product-box p-3">
                    <h5>Products</h5>
                    <p className="mb-0">Manage Stock</p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="billing-box p-3">
                    <h5>Billing</h5>
                    <p className="mb-0">Create Bills</p>
                  </div>
                </div>

              </div><hr />

             

            </div>
          </div>

        </div>
      </section>

    
      <section className="features py-5" id="features">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Features</h2>
            <p className="text-secondary">
              Everything you need to manage your business
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="feature-box product-feature p-4 h-100">
                <h5 className="fw-bold">Product Management</h5>
                <p className="text-secondary mb-0">
                  Manage products, prices and available stock
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-box billing-feature p-4 h-100">
                <h5 className="fw-bold">Fast Billing</h5>
                <p className="text-secondary mb-0">
                  Create bills and calculate totals easily
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-box inventory-feature p-4 h-100">
                <h5 className="fw-bold">Inventory Tracking</h5>
                <p className="text-secondary mb-0">
                  Track available stock after billing
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    
      <section className="container py-5" id="about">
        <div className="about-box p-4 p-md-5">
          <div className="row align-items-center">

            <div className="col-md-7">
              <h2 className="fw-bold">About QuickBill</h2>

              <p className="text-secondary mb-0">
                QuickBill is a simple billing and inventory management
                system that helps businesses manage products, create
                bills and track stock efficiently
              </p>
            </div>

            <div className="col-md-5 mt-4 mt-md-0">
              <div className="about-note p-3">
                <h5 className="fw-bold">Our Goal</h5>
                <p className="text-secondary mb-0">
                  Making everyday business operations simple and efficient
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      
      <section className="contact py-5" id="contact">
        <div className="container text-center">

          <h2 className="fw-bold mb-3">Contact Us</h2>

          <p className="text-secondary">
            Have questions? We would love to hear from you
          </p>

          <a
            className="btn btn-outline-primary mt-2"
            href="mailto:your-email@example.com"
          >
            quickbill@gmail.com
          </a>

        </div>
      </section>

    
     <footer className="footer bg-dark text-white py-4">
  <div className="container text-center">

    <h4 className="fw-bold">
      Quick<span className="text-primary">Bill</span>
    </h4>

    <p className="text-light">
      Simple Billing for Your Business
    </p>

   

    <hr className="border-secondary" />

    <p className="small text-light mb-0">
      © 2026 QuickBill. All rights reserved.
    </p>

  </div>
</footer>
    

    </div>
  );
}

export default Home;