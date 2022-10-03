export const getEnvironments = () => {
  const meta = import.meta.env;

  return {
    ...meta,
  };
};
