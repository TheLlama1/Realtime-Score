import LoadingComponent from "./components/loadingComponent";

export default function Loading() {
  return (
    <div className="flex flex-col w-full justify-center items-center h-screen">
      <LoadingComponent color="#BDBDBD" />
    </div>
  );
}
