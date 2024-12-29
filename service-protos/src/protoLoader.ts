import path from 'path';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';

/**
 * Utility to load a proto file
 * @param protoFileName - Name of the proto file to load
 * @returns The loaded gRPC package
 */
export const loadProto = (protoFileName: string): any => {
  const protoPath = path.resolve(__dirname, '../protos', protoFileName);
  const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  return grpc.loadPackageDefinition(packageDefinition);
};

