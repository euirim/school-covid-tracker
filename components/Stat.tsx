type Props = {
  valueChange: number;
  value: number;
  label: string;
};

const Stat: React.FC<Props> = ({ label, value, valueChange }) => (
  <div className="flex flex-col">
    <div className="flex items-start mb-1">
      <h2 className="text-4xl leading-none">{value}</h2>

      {valueChange !== 0 && (
        <h3 className="mt-1 ml-2 text-xl font-bold leading-none text-red-600">
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
