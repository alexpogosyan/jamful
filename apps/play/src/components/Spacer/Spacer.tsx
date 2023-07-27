interface SpacerProps {
  h?: string;
  w?: string;
}

export const Spacer = (props: SpacerProps) => {
  const { h = "auto", w = "auto" } = props;

  return (
    <div
      style={{
        width: w,
        height: h,
      }}
    ></div>
  );
};
