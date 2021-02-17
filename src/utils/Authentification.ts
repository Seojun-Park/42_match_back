const Authentification = (resolverFn) => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error("No JWT, refuse to proceed");
  }
  const resolved = await resolverFn(parent, args, context, info);
  return resolved;
};

export default Authentification;
