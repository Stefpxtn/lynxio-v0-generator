import { NextRequest, NextResponse } from "next/server";

type Payload = {
  name: string;
  sector?: string;
  activity?: string;
  address?: string;
  phone?: string;
  email?: string;
  area?: string;
  hours?: string;
};

function clean(value?: string) {
  return (value ?? "").toString().replace(/[<>]/g, "");
}

function buildHtml(data: Payload): string {
  const name = clean(data.name) || "Votre entreprise";
  const sector = clean(data.sector) || "Entreprise locale";
  const activity = clean(data.activity) || sector;
  const address = clean(data.address) || "";
  const phone = clean(data.phone) || "";
  const email = clean(data.email) || "";
  const area = clean(data.area) || "France entière";
  const hours = clean(data.hours) || "Sur rendez-vous";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name} - ${activity}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
</head>
<body class="bg-gray-50">
  <!-- Header -->
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center">
          <i class="fas fa-briefcase text-amber-600 text-2xl mr-3"></i>
          <h1 class="text-2xl font-bold text-gray-900">${name}</h1>
        </div>
        <div class="hidden md:flex items-center space-x-6">
          ${phone ? `<a href="tel:${phone}" class="text-amber-600 hover:text-amber-700 font-medium">
            <i class="fas fa-phone mr-2"></i>${phone}
          </a>` : ""}
          <a href="#contact" class="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition duration-300">
            Demander un devis gratuit
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          ${activity}
        </h2>
        <p class="text-xl text-gray-600 mb-4">
          ${sector}
        </p>
        <p class="text-lg text-gray-500 mb-8">
          ${address}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          ${phone ? `<a href="tel:${phone}" class="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition duration-300 font-semibold">
            <i class="fas fa-phone mr-2"></i>Appeler maintenant
          </a>` : ""}
          <a href="#contact" class="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-lg hover:bg-amber-600 hover:text-white transition duration-300 font-semibold">
            Demander un devis gratuit
          </a>
        </div>
        ${hours ? `<div class="bg-white rounded-lg shadow-md p-4 inline-block">
          <div class="flex items-center justify-center">
            <i class="fas fa-clock text-amber-600 mr-3"></i>
            <span class="text-gray-700 font-medium">${hours}</span>
          </div>
        </div>` : ""}
      </div>
    </div>
  </section>

  <!-- Zone d'intervention -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h3 class="text-3xl font-bold text-gray-900 mb-6">Zone d'intervention</h3>
        <div class="bg-white rounded-lg shadow-md p-6 inline-block">
          <i class="fas fa-map-marker-alt text-amber-600 text-3xl mb-3"></i>
          <p class="text-xl font-semibold text-gray-900">${area}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12">
        <div class="bg-gray-50 rounded-lg p-8">
          <h4 class="text-2xl font-semibold text-gray-900 mb-6">Demander un devis gratuit</h4>
          <form class="space-y-4">
            <input class="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Nom complet" />
            <input class="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Téléphone" />
            <input class="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Email" />
            <textarea rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Votre demande..."></textarea>
            <button type="submit" class="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 font-semibold">
              Envoyer ma demande
            </button>
          </form>
        </div>

        <div class="space-y-4">
          ${address ? `
          <div class="flex items-start">
            <i class="fas fa-map-marker-alt text-amber-600 text-xl mr-4 mt-1"></i>
            <div>
              <p class="font-semibold text-gray-900">Adresse</p>
              <p class="text-gray-600">${address}</p>
            </div>
          </div>` : ""}
          ${phone ? `
          <div class="flex items-start">
            <i class="fas fa-phone text-amber-600 text-xl mr-4 mt-1"></i>
            <div>
              <p class="font-semibold text-gray-900">Téléphone</p>
              <a href="tel:${phone}" class="text-amber-600 hover:text-amber-700">${phone}</a>
            </div>
          </div>` : ""}
          ${email ? `
          <div class="flex items-start">
            <i class="fas fa-envelope text-amber-600 text-xl mr-4 mt-1"></i>
            <div>
              <p class="font-semibold text-gray-900">Email</p>
              <a href="mailto:${email}" class="text-amber-600 hover:text-amber-700">${email}</a>
            </div>
          </div>` : ""}
        </div>
      </div>
    </div>
  </section>

  <footer class="bg-gray-900 text-white py-6">
    <div class="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
      © ${new Date().getFullYear()} ${name}. Tous droits réservés.
    </div>
  </footer>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Payload>;

    if (!body?.name) {
      return NextResponse.json(
        { error: "Missing 'name' in request body." },
        { status: 400 }
      );
    }

    const html = buildHtml(body as Payload);
    return NextResponse.json({ html }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/generate-html:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed, use POST with JSON body." },
    { status: 405 }
  );
}
