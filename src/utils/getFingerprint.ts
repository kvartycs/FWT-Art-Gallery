import FingerPrintJS from "@fingerprintjs/fingerprintjs";

export const getFingerprint = async () => {
  const fingerprint = await FingerPrintJS.load();
  const { visitorId } = await fingerprint.get();
  return visitorId;
};
