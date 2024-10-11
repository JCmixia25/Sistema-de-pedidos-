import React from "react";
import "./informacion.css"; 
import MyMapComponent from "../components/MyMapComponent"; 

const informacion = () => {
  return (
    <div className="contacts-container">
      <div className="contact-info">
        <h2>Información de Contacto</h2>
        <p><strong>Teléfono:</strong> +502 59620587</p>
        <p>
          <strong>Correo Electrónico:</strong>
          <i className="fas fa-envelope" style={{ marginLeft: '5px', marginRight: '5px' }}></i>
          <a href="mailto:cotizaciones@agrodigitalgt.tech" className="email-link">
            cotizaciones@agrodigitalgt.tech
          </a>
        </p>
        <h3>Redes Sociales</h3>
        <ul>
          <li>
            <a href="https://wa.me/50259620587" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> WhatsApp
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/pedidospersia" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i> Facebook
            </a>
          </li>
          <li>
          <a href="https://www.instagram.com/pedidospersia" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i> Instagram
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com/pedidospersia" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a>
          </li>
        </ul>
      </div>
      <br/>
      <div className="about-us">
        <h2>¿Quiénes Somos?</h2>
        <p><strong>PERSIA:</strong> Somos un equipo de gente apasionada cuya meta es mejorar la vida de cada uno a través de productos disruptivos. Construimos grandes productos para solucionar sus problemas de negocio.
        Nuestros productos están diseñados para pequeñas y medianas empresas que desean optimizar su desempeño.</p>
        <p><strong>Misión:</strong> Brindar a nuestros clientes productos de calidad y un servicio excepcional.</p>
        <p><strong>Visión:</strong> Ser la principal referencia en la venta de productos persas a nivel Nacional e Internacional.</p>
        <p><strong>Valores:</strong> Calidad, Transparencia, Compromiso, Innovación.</p>
      </div>
      <br/>
      <div className="location">
        <h2>Ubicación</h2>
        <p><strong>Dirección:</strong> 33 CALLE "C", 10-16, ZONA 7, COLONIA BAMVI II GUATEMALA</p>
        <MyMapComponent />
      </div>
    </div>
  );
};

export default informacion;