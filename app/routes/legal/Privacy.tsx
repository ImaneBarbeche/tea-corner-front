export default function Privacy() {
  return (
    <main className="max-w-2xl mx-auto px-8 py-12 flex flex-col gap-8">
      <div>
        <h1 className="text-4xl">Politique de Confidentialité</h1>
        <time className="text-sm text-gray-500 mt-2 block">
          Dernière mise à jour : 10 février 2026
        </time>
        <p className="mt-4">
          La présente Politique de Confidentialité explique comment{" "}
          <strong>TeaCorner</strong> collecte, utilise, stocke et protège vos
          données personnelles lorsque vous utilisez notre application. Nous
          nous engageons à respecter le{" "}
          <strong>
            Règlement Général sur la Protection des Données (RGPD)
          </strong>{" "}
          et à garantir la transparence sur l'usage de vos informations.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">
          1. Données personnelles collectées
        </h2>
        <p>
          Nous collectons uniquement les données strictement nécessaires au
          fonctionnement de TeaCorner :
        </p>
        <h3 className="font-medium">
          Données fournies lors de la création de compte
        </h3>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Nom d'utilisateur</li>
          <li>Adresse email</li>
          <li>Mot de passe (haché et jamais stocké en clair)</li>
          <li>Consentement à la politique de confidentialité</li>
        </ul>
        <h3 className="font-medium">
          Données générées par l'utilisation du service
        </h3>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Préférences utilisateur (ex : thèmes, favoris)</li>
          <li>
            Historique d'utilisation (ex : recettes consultées, interactions)
          </li>
        </ul>
        <h3 className="font-medium">Données que nous NE collectons PAS</h3>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Données sensibles (santé, religion, opinions politiques…)</li>
          <li>Données de localisation précise</li>
          <li>Données bancaires</li>
          <li>Cookies publicitaires</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">2. Finalités du traitement</h2>
        <p>Vos données sont utilisées uniquement pour :</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Créer et gérer votre compte utilisateur</li>
          <li>Assurer l'authentification et la sécurité</li>
          <li>Vous permettre d'accéder aux fonctionnalités de TeaCorner</li>
          <li>Améliorer l'expérience utilisateur</li>
          <li>
            Vous envoyer des emails liés au fonctionnement du service (ex :
            vérification d'email, sécurité)
          </li>
        </ul>
        <p>
          Nous ne vendons <strong>jamais</strong> vos données.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">3. Base légale du traitement</h2>
        <p>Nous traitons vos données sur les bases légales suivantes :</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>
            <strong>Exécution du contrat</strong> : création de compte, accès à
            l'application
          </li>
          <li>
            <strong>Consentement</strong> : acceptation de la politique de
            confidentialité
          </li>
          <li>
            <strong>Intérêt légitime</strong> : sécurité, prévention des abus
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">4. Durée de conservation</h2>
        <p>Nous conservons vos données :</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Tant que votre compte est actif</li>
          <li>
            Jusqu'à <strong>2 ans</strong> d'inactivité
          </li>
          <li>
            Ou jusqu'à ce que vous demandiez la suppression de votre compte
          </li>
        </ul>
        <p>
          Les logs techniques sont conservés <strong>30 jours</strong> maximum.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">5. Sécurité des données</h2>
        <p>Nous mettons en place des mesures de sécurité strictes :</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Hachage des mots de passe (argon2)</li>
          <li>Cookies sécurisés (httpOnly, SameSite)</li>
          <li>Vérification d'email</li>
          <li>
            Protection contre les attaques (CSRF, rate limiting, validation des
            données)
          </li>
          <li>Accès restreint aux données</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">6. Partage des données</h2>
        <p>
          Nous ne partageons vos données <strong>avec aucun tiers</strong>, sauf
          :
        </p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>
            Fournisseurs techniques indispensables (ex : service d'envoi
            d'email)
          </li>
          <li>Obligations légales (rare et encadré)</li>
        </ul>
        <p>Ces partenaires respectent eux aussi le RGPD.</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">7. Vos droits (RGPD)</h2>
        <p>Vous disposez des droits suivants :</p>
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="font-medium">Droit d'accès</h3>
            <p>Obtenir une copie de vos données.</p>
          </div>
          <div>
            <h3 className="font-medium">Droit de rectification</h3>
            <p>Modifier vos informations personnelles.</p>
          </div>
          <div>
            <h3 className="font-medium">
              Droit à l'effacement ("droit à l'oubli")
            </h3>
            <p>Supprimer votre compte et toutes vos données.</p>
          </div>
          <div>
            <h3 className="font-medium">Droit à la portabilité</h3>
            <p>Télécharger vos données dans un format lisible.</p>
          </div>
          <div>
            <h3 className="font-medium">Droit d'opposition</h3>
            <p>Vous opposer à certains traitements.</p>
          </div>
          <div>
            <h3 className="font-medium">Droit de retirer votre consentement</h3>
            <p>À tout moment, sans justification.</p>
          </div>
        </div>
        <p>
          Pour exercer vos droits, vous pouvez utiliser les fonctionnalités
          intégrées dans l'application ou nous contacter.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">8. Cookies</h2>
        <p>
          TeaCorner utilise uniquement des <strong>cookies techniques</strong>{" "}
          nécessaires au fonctionnement du service (authentification).
        </p>
        <p>
          Nous n'utilisons <strong>pas</strong> :
        </p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>de cookies publicitaires</li>
          <li>de cookies de tracking</li>
          <li>de cookies analytiques sans consentement</li>
        </ul>
        <p>Aucun bandeau cookies n'est requis dans ce cas.</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">9. Suppression du compte</h2>
        <p>
          Vous pouvez supprimer votre compte à tout moment depuis votre espace
          utilisateur. Toutes vos données seront définitivement supprimées dans
          un délai maximum de <strong>30 jours</strong>.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">10. Contact</h2>
        <p>
          Pour toute question concernant la protection de vos données :{" "}
          contact@teacorner.com
        </p>
      </section>
    </main>
  );
}
