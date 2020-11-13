type Props = {
  valueChange: number;
  value: number;
  label: string;
};

const Stat: React.FC<Props> = ({ label, value, valueChange }) => (
  <div className="flex flex-col">
    <div className="flex flex-col items-start mb-1 sm:flex-row">
      <h2 className="text-2xl font-bold leading-none sm:font-normal sm:text-4xl">
        {value}
      </h2>

      {valueChange !== 0 && (
        <h3 className="mt-1 ml-1 text-sm font-bold leading-none text-red-600 sm:ml-2 sm:text-lg md:text-xl">
          +{valueChange}
        </h3>
      )}
    </div>
    <h3 className="text-xs font-bold tracking-wider text-gray-600 uppercase">
      {label}
    </h3>
  </div>
);

export default Stat;
