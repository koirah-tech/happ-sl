export type CredentialRecord = {
  credentialId: string;
  fullName: string;
  cadre: string;
  pinCode: string;
  dateIssued: string; // ISO string
  photoUrl: string;
};

const credentialRecords: CredentialRecord[] = [
  {
    credentialId: "MOHS-DOC-98765",
    fullName: "Amina Kamara",
    cadre: "Medical Doctor",
    pinCode: "MOHS-DOC-98765",
    dateIssued: "2025-10-14T08:30:00.000Z",
    photoUrl: "/images/credentials/aminata-kamara.svg",
  },
  {
    credentialId: "MOHS-NUR-54321",
    fullName: "Josephine Conteh",
    cadre: "Registered Nurse",
    pinCode: "MOHS-NUR-54321",
    dateIssued: "2025-07-01T09:15:00.000Z",
    photoUrl: "/images/credentials/josephine-conteh.svg",
  },
  {
    credentialId: "MOHS-MID-11223",
    fullName: "Fatmata Sesay",
    cadre: "Certified Midwife",
    pinCode: "MOHS-MID-11223",
    dateIssued: "2024-12-02T11:45:00.000Z",
    photoUrl: "/images/credentials/fatmata-sesay.svg",
  },
];

const networkDelay = (ms = 600) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export async function mockVerifyCredential(
  credentialId: string
): Promise<CredentialRecord> {
  await networkDelay();
  const match = credentialRecords.find(
    (record) => record.credentialId.toLowerCase() === credentialId.toLowerCase()
  );

  if (!match) {
    const error = new Error("Credential not found");
    error.name = "NotFoundError";
    throw error;
  }

  return match;
}

export async function mockGetCredentialById(
  credentialId: string
): Promise<CredentialRecord | null> {
  await networkDelay(400);
  const match = credentialRecords.find(
    (record) => record.credentialId.toLowerCase() === credentialId.toLowerCase()
  );
  return match ?? null;
}
