import "../../CSS/BodyElement.css"

export default function BodyElement({ svg, heading, para }) {
  return (
    <>
      <div className="cards">
        <div className="svg">{svg}</div>
        <h2>{heading}</h2>
        <p>{para}</p>
      </div>
    </>
  );
}
