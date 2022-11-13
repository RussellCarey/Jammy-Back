const startTransaction = async (datasource: any) => {
  const queryRunner = datasource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  return queryRunner;
};

export default startTransaction;
