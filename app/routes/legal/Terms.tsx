export default function Terms() {
  return (
    <main className="max-w-2xl mx-auto px-8 py-12 flex flex-col gap-8">
      <div>
        <h1 className="text-4xl">Conditions Générales d'Utilisation</h1>
        <time className="text-sm text-gray-500 mt-2 block">
          Dernière mise à jour : 10 février 2026
        </time>
        <p className="mt-4">
          Les présentes Conditions Générales d'Utilisation (CGU) régissent
          l'accès et l'utilisation de l'application TeaCorner. En créant un
          compte, vous acceptez ces conditions dans leur intégralité.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">1. Description du service</h2>
        <p>
          TeaCorner est une application compagnon dédiée au thé, permettant aux
          utilisateurs de découvrir des thés, consulter des informations sur
          leurs préférences et infusions, et gérer leur espace personnel.
          TeaCorner est un service gratuit, sans vente de produits physiques.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">2. Création de compte</h2>
        <p>
          Pour accéder aux fonctionnalités, vous devez créer un compte en
          fournissant des informations exactes. Vous êtes responsable de :
        </p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>La confidentialité de vos identifiants</li>
          <li>Toute activité effectuée depuis votre compte</li>
          <li>La mise à jour de vos informations si elles changent</li>
        </ul>
        <p>
          Vous ne pouvez pas créer plusieurs comptes ou usurper l'identité d'une
          autre personne.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">3. Utilisation acceptable</h2>
        <p>Il est interdit d'utiliser TeaCorner pour :</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Tenter de compromettre la sécurité de l'application</li>
          <li>Automatiser des requêtes de manière abusive (bots, scraping)</li>
          <li>Publier du contenu illégal, offensant ou trompeur</li>
          <li>Contourner les mécanismes d'authentification</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">4. Disponibilité du service</h2>
        <p>
          TeaCorner est fourni "tel quel". Nous ne garantissons pas une
          disponibilité continue du service. Des interruptions peuvent survenir
          pour maintenance ou raisons techniques, sans préavis.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">5. Limitation de responsabilité</h2>
        <p>TeaCorner ne peut être tenu responsable :</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>D'une interruption ou indisponibilité du service</li>
          <li>De la perte de données due à un incident technique</li>
          <li>
            Des décisions prises par l'utilisateur sur la base des informations
            disponibles dans l'app
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">6. Suspension de compte</h2>
        <p>
          Nous nous réservons le droit de suspendre ou supprimer un compte en
          cas de non-respect des présentes CGU, sans préavis ni compensation.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">7. Propriété intellectuelle</h2>
        <p>
          Le contenu de TeaCorner (design, textes, code) est protégé. Vous ne
          pouvez pas le reproduire ou l'exploiter sans autorisation.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">8. Modification des CGU</h2>
        <p>
          Nous pouvons modifier ces CGU à tout moment. Les changements importants
          seront notifiés par email. La poursuite de l'utilisation du service
          vaut acceptation des nouvelles conditions.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">9. Droit applicable</h2>
        <p>
          Les présentes CGU sont soumises au droit français. En cas de litige,
          les tribunaux compétents sont ceux du ressort du siège de TeaCorner.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">10. Contact</h2>
        <p>Pour toute question : contact@teacorner.com</p>
      </section>
    </main>
  );
}
