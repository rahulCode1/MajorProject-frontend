import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <Oval
      height={50}
      width={50}
      color="#007bff" // You can change color
      secondaryColor="#ccc"
      strokeWidth={4}
    />
  );
};

export default Loading;
