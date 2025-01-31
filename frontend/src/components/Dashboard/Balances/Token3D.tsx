import "./Token3D.css"; // Import styles

interface Token3DProps {
  icon: string; // Base64 or URL
  altText?: string;
}

const Token3D: React.FC<Token3DProps> = ({ icon, altText }) => {
  return (
    <div className="coin hidden">
      <div className="side heads">
        <img src={icon} alt={altText || "Token"} className="token-img" />
      </div>
      <div className="side tails">
        <img
          src={icon}
          alt={altText || "Token"}
          className="token-img flipped"
        />
      </div>
    </div>
  );
};

export default Token3D;
