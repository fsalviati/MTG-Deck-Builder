import "../styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>Designed by Fernando Salviati - {currentYear}</p>
    </footer>
  );
};

export default Footer;
